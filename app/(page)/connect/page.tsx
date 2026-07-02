'use client'
import { SwapRightOutlined, FacebookOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const Connect = () => {
    const SOCIALS = [
        {
            key: "facebook",
            label: "Facebook",
            handleLabel: "Add friends & follow",
            Icon: FacebookOutlined,
            color: "#1877F2",
            link: "https://www.facebook.com/phuongnamgroupers",
        },
        {
            key: "github",
            label: "Github",
            handleLabel: "View source code",
            Icon: GithubOutlined,
            color: "#171515",
            link: "https://github.com/trphuongnam",
        },
        {
            key: "linkedin",
            label: "LinkedIn",
            handleLabel: "Connect",
            Icon: LinkedinOutlined,
            color: "#0A66C2",
            link: "https://www.linkedin.com/in/nam-tr%E1%BA%A7n-18b59523b/",
        },
    ];

    return (
        <div className="w-full min-h-screen bg-white pt-6 container">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-neutral-900 page-title">
                CONNECT ME
            </h1>
            {/* Social links */}
            <div className="space-y-3 text-left social-group default-font">
                {SOCIALS.map(({ key, label, handleLabel, Icon, color, link }) => (
                <a
                    key={key}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-item group flex items-center gap-4 rounded-xl border border-neutral-200 px-4 py-3 transition-all duration-200 hover:border-neutral-900 hover:shadow-sm"
                >
                    <span
                    className="flex items-center justify-center w-15 h-15 rounded-full shrink-0"
                    style={{ backgroundColor: `${color}1A` }}
                    >
                    <Icon size={20} color={color} className='social-item__icon'/>
                    </span>
                    <span className="flex-1 min-w-0">
                    <span className="block text-sm social-item__label">
                        {label}
                    </span>
                    <span className="block text-xs truncate social-item__text">
                        {handleLabel}
                    </span>
                    </span>
                    <SwapRightOutlined
                        size={18}
                        className="text-neutral-300 transition-transform duration-200 group-hover:text-neutral-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 social-item__icon"
                    />
                </a>
                ))}
            </div>
        </div>
    )
}

export default Connect;