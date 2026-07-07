"use client";
import { useState } from "react";
import {
  MailOutlined,
  UserOutlined,
  MessageOutlined,
  SendOutlined,
  CheckCircleOutlined,
  AlertOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface ErrorsInterface {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface FormInterface {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const EMAILJS_CONFIG = {
    serviceId: process.env.NEXT_PUBLIC_MAIL_SERVICE_ID ?? '',
    templateId: process.env.NEXT_PUBLIC_MAIL_TEMPLATE_ID ?? '',
    publicKey: process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY ?? '',
  };
  
  const initialForm = { name: "", email: "", subject: "", message: "" };

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
  
    if (!form.name.trim()) errors.name = t('common.pleaseEnterName');
    if (!form.email.trim()) {
      errors.email = t('common.pleaseEnterEmail');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t('common.emailNotCorrect');
    }
    if (!form.subject.trim()) errors.subject = t('common.pleaseEnterSubject');
    if (!form.message.trim()) errors.message = t('common.pleaseEnterMessageContent');
    return errors;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return;

    setStatus("sending");
    setServerError("");

    try {
      // ---- CÁCH 1: Gửi email trực tiếp bằng EmailJS (client-side) ----
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        EMAILJS_CONFIG.publicKey
      );

      // ---- CÁCH 2 (thay thế): Gửi qua backend của bạn ----
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Gửi thất bại");

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setServerError(t('common.sendEmailError'));
      setStatus("error");
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
        {t('common.contact')}
      </h1>
      <div className="w-full max-w-lg contact-form">
        {/* Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-white rounded-3xl border border-neutral-200 shadow-[0_2px_20px_rgba(0,0,0,0.04)] px-7 py-8 space-y-5"
        >
          {/* Name */}
          <div className="form-group">
            <div className="w-50 form-group__item">
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5 label default-font">
                  {t('page.profile.fullName')}
                </label>
                <div className="relative">
                <UserOutlined
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder={t('page.contact.exampleName')}
                    className={`${fieldClass(errors.name)} pl-11 form-input default-font`}
                />
                </div>
                {errors.name && (
                <p className="mt-1 text-xs text-red-500 default-font">{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div className="w-50 form-group__item">
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
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 label default-font">
              {t('page.contact.subject')}
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder={t('page.contact.subject')}
              className={`${fieldClass(errors.subject)} form-input default-font`}
            />
            {errors.subject && (
              <p className="mt-1 text-xs text-red-500 default-font">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5 label default-font">
              {t('page.contact.message')}
            </label>
            <div className="relative">
              <MessageOutlined
                size={16}
                className="absolute left-4 top-3.5 text-neutral-400"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('page.contact.message')}
                rows={5}
                className={`${fieldClass(errors.message)} pl-11 resize-none form-input default-font`}
              />
            </div>
            {errors.message && (
              <p className="mt-1 text-xs text-red-500 default-font">{errors.message}</p>
            )}
          </div>

          {/* Status messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700 default-font">
              <CheckCircleOutlined size={18} />
              {t('page.contact.sendSuccess')}
            </div>
          )}
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
                {t('page.contact.sending')}
              </>
            ) : (
              <>
                <SendOutlined size={16} />
                {t('page.contact.send')}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
