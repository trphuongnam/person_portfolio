import React from "react";
import { Image } from "antd";

interface infoRowInterface {
  label: string,
  value: string
}
const InfoRow = ({ label, value }: infoRowInterface) => (
  <div className="flex text-sm sm:text-[20px] leading-7">
    <span className="w-[150px] shrink-0 font-semibold tracking-wide text-teal-600">
      {label}
    </span>
    <span className="font-medium text-neutral-900">: {value}</span>
  </div>
);

export default function PersonProfile({
  avatarUrl = "/assets/images/profile_image.png",
  info = {
    fullName: "TRAN PHUONG NAM",
    stageName: "NAMTP",
    birthday: "NOV 18TH 1999",
    hometown: "DA NANG CITY – VIETNAM",
    occupation: "SOFTWARE DEVELOPER",
  },
}) {
  return (
    <div className="w-full min-h-screen bg-white pt-6 container">
      <div className="w-full max-w-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* LEFT: Text content */}
        <div className="order-2 md:order-1">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] text-neutral-900">
            PROFILE
          </h1>
          <p className="mt-1 text-teal-600 tracking-[0.2em] text-sm sm:text-base">
            IT / SOFTWARE DEVELOPER
          </p>
 
          <div className="mt-6 space-y-1 person-info">
            <InfoRow label="FULL NAME" value={info.fullName} />
            <InfoRow label="STAGE NAME" value={info.stageName} />
            <InfoRow label="BIRTHDAY" value={info.birthday} />
            <InfoRow label="HOMETOWN" value={info.hometown} />
            <InfoRow label="OCCUPATION" value={info.occupation} />
          </div> 
          <hr className="mt-10 border-neutral-200 max-w-xs" />
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
              src={avatarUrl}
              alt={info.stageName}
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
