-- =========================================================
-- EXTENSIONS
-- =========================================================

create extension if not exists pgcrypto;


-- =========================================================
-- USERS
-- =========================================================
-- Authentication:
--   auth.users
--
-- Application profile:
--   public.users
--
-- Không lưu password ở public.users.
-- Supabase Auth sẽ quản lý password.
-- =========================================================

create table public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    username text not null,
    phone_number text,
    email text not null,
    status integer not null default 1,
    role text not null default 'Member',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint users_email_unique unique (email),
    constraint users_username_unique unique (username)
);


-- =========================================================
-- CATEGORIES
-- =========================================================

create table public.categories (
    id uuid primary key default gen_random_uuid(),
    user_id uuid
        references public.users(id)
        on delete set null,
    name text not null,
    location_display text not null,
    status integer not null default 1,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- =========================================================
-- CONTACTS
-- =========================================================

create table public.contacts (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    email text not null,
    subject text not null,
    content text not null,
    status text default 'New',
    send_from text,
    created_at timestamptz,
    phone_number text
);


-- =========================================================
-- POSTS
-- =========================================================

create table public.posts (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null
        references public.categories(id)
        on delete restrict,
    user_id uuid
        references public.users(id)
        on delete set null,
    title text not null,
    description text not null,
    content text not null,
    location_display text,
    status integer not null default 1,
    image_url text
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- =========================================================
-- PROFILE
-- =========================================================

create table public.profiles (
    id uuid primary key default gen_random_uuid(),
    full_name text not null,
    nickname text,
    email text not null,
    date_of_birth date,
    location text,
    job_title text not null,
    avatar_url text,
    introduction text,
    years_of_experience integer,
    description text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);


-- =========================================================
-- SOCIAL LINKS
-- =========================================================

create table public.social_links (
    id uuid primary key default gen_random_uuid(),
    platform text not null,
    url text not null,
    description text,
    sort_order integer,
    status integer not null default 1
);


-- =========================================================
-- INDEXES
-- =========================================================

create index idx_categories_user_id
    on public.categories(user_id);

create index idx_categories_status
    on public.categories(status);


create index idx_posts_category_id
    on public.posts(category_id);

create index idx_posts_user_id
    on public.posts(user_id);

create index idx_posts_status
    on public.posts(status);

create index idx_posts_created_at
    on public.posts(created_at desc);


create index idx_contacts_email
    on public.contacts(email);

create index idx_contacts_status
    on public.contacts(status);

create index idx_contacts_created_at
    on public.contacts(created_at desc);


create index idx_social_links_sort_order
    on public.social_links(sort_order);

create index idx_social_links_status
    on public.social_links(status);