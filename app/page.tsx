"use client"
import { useTranslation, Trans } from "react-i18next";
import { PROFILE_EN, PROFILE_VN } from "./mockData/profile";
import { useState, useEffect } from "react";

interface infoRowInterface {
  label: string,
  value: string
}
const InfoRow = ({ label, value }: infoRowInterface) => (
  <div className="flex leading-7 text-20 info-row">
    <span className="w-[150px] shrink-0 font-semibold tracking-wide text-teal-600 info-row__label">
      {label}: 
    </span>
    <span className="font-medium text-neutral-900 info-row__value">{value}</span>
  </div>
);

export default function PersonProfile() {
  const { t, i18n } = useTranslation();

  const [information, setInformation] = useState<any>(PROFILE_VN);

  useEffect(() => {
      if (i18n.language == 'vi') {
        setInformation(PROFILE_VN)
      } else {
        setInformation(PROFILE_EN)
      }
  })

  return (
    <div className="w-full min-h-screen bg-white pt-6 container">
      <div className="w-full max-w-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Text content */}
        <div className="information-box">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-neutral-900">
              {t("common.profile")}
            </h1>
            <p className="mt-1 text-teal-600 tracking-[0.2em] text-sm sm:text-base">
              IT / SOFTWARE DEVELOPER
            </p>

            
            <div className="mt-6 space-y-1 person-info default-font">
              <InfoRow label={t("page.profile.fullName")} value={information.info.fullName} />
              <InfoRow label={t("page.profile.stageName")} value={information.info.stageName} />
              <InfoRow label={t("common.email")} value={information.info.email} />
              <InfoRow label={t("page.profile.birthday")} value={information.info.birthday} />
              <InfoRow label={t("page.profile.hometown")} value={information.info.hometown} />
              <InfoRow label={t("page.profile.occupation")} value={information.info.occupation} />
            </div> 
            <hr className="mt-10 border-neutral-200 max-w-xs" />
          </div>
          <p className="text-20 default-font">
            <Trans i18nKey="page.profile.profileIntro" />
          </p>
        </div>

        {/* RIGHT: Avatar with decorative rings */}
        <div className="order-1 md:order-2 relative flex items-center justify-center h-[420px] sm:h-[520px]">
          {/* Soft background circle */}
          <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full bg-neutral-100" />
 
          {/* Teal outline circle, offset */}
          <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border-2 border-teal-600 translate-x-6 translate-y-6 sm:translate-x-8 sm:translate-y-8" />
 
          {/* Photo, clipped to circle */}
          <div className="relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full overflow-hidden shadow-xl translate-x-6 translate-y-6 sm:translate-x-8 sm:translate-y-8">
            <img
              src={information.avatarUrl}
              alt={information.info.stageName}
              className="w-full h-full object-cover"
            />
          </div>
 
          {/* Decorative diagonal lines */}
          <div className="absolute bottom-2 left-2 w-16 h-px bg-teal-600 rotate-[-35deg]" />
          <div className="absolute bottom-14 left-16 w-20 h-px bg-teal-600 rotate-[-35deg]" />
          <div className="absolute top-14 right-2 w-16 h-px bg-teal-600 rotate-[-35deg]" />
        </div>
      </div>
    </div>
  );
}
