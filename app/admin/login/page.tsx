"use client";
import { useState } from "react";
import {
  MailOutlined,
  SendOutlined,
  AlertOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/navigation';

interface ErrorsInterface {
  email?: string;
  password?: string;
}

interface FormInterface {
  email: string;
  password: string;
}

export default function ContactPage() {
  const router = useRouter()
  const initialForm = { email: "", password: ""};

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({}) as any;
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverError, setServerError] = useState("");

  const { t } = useTranslation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  function validate(form: FormInterface) {
    const errors: ErrorsInterface = {};
  
    if (!form.email.trim()) {
      errors.email = t('common.pleaseEnterEmail');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('common.emailNotCorrect');
    }
    if (!form.password.trim()) errors.password = t('common.pleaseEnterPassword');
    return errors;
  }

  const handleSubmit = async (e: any) => {
        e.preventDefault();
        const foundErrors = validate(form);
        setErrors(foundErrors);
        if (Object.keys(foundErrors).length > 0) return;

        setStatus("sending");
        setServerError("");

        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      
        const data = await res.json();
      
        if (data.success) {
          router.push('/admin/contact');
        } else {
          setStatus("error");
          setServerError(data.message);
        }
  };

  const fieldClass = (hasError: any) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 outline-none transition-colors
     ${
       hasError
         ? "border-red-400 focus:border-red-500"
         : "border-neutral-200 focus:border-neutral-900"
     }`;

  return (
    <div className="min-h-screen w-full pt-6 container">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-neutral-900 page-title">
        {t('page.login.login')}
      </h1>
      <div className="w-full max-w-lg contact-form">
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl border border-neutral-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-7 py-8 space-y-5"
        >
          {/* Email */}
          <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 label default-font">
                  {t('common.email')}
                </label>
                <div className="relative">
                <MailOutlined
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="nguyenvana@email.com"
                    className={`${fieldClass(errors.email)} pl-11 form-input default-font`}
                />
                </div>
                {errors.email && (
                <p className="mt-1 text-xs text-red-500 default-font">{errors.email}</p>
                )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 label default-font">
              {t('page.login.password')}
            </label>
            <input
              type="text"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder={t('page.login.password')}
              className={`${fieldClass(errors.password)} form-input default-font`}
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500 default-font">{errors.subject}</p>
            )}
          </div>
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 default-font">
              <AlertOutlined size={18} />
              {serverError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "sending"}
            className="default-font ctm-button w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 text-white text-sm font-semibold py-3.5 transition-all hover:bg-neutral-800 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "sending" ? (
              <>
                <LoadingOutlined size={18} className="animate-spin" />
              </>
            ) : (
              <>
                <SendOutlined size={16} />
                {t('page.login.login')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
