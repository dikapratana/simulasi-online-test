import { useState } from "react";
import HeaderFragment from "../../fragments/home/header";
import { IMAGES } from "../../configs/constants/images";
import { RefreshCw } from "lucide-react";
import ProfileFragment from "../../fragments/home/profile";

export default function HomePage() {
  const [step, setStep] = useState(1);
  return (
    <div>
      <div className="flex justify-center shadow-md py-4 items-center">
        <div className="container flex justify-between">
          <img src={IMAGES.Logo} className="h-12" alt="logo" />
          <span className="flex gap-1 text-sm font-medium text-primary items-center justify-center cursor-pointer">
            <RefreshCw className="w-5 h-5 text-primary" /> Reset Form
          </span>
        </div>
      </div>
      <div className="flex justify-center py-8">
        <div className="container">
          <HeaderFragment step={step} />
          <div className="py-8">
            {step === 1 && <ProfileFragment step={step} setStep={setStep} />}
          </div>
        </div>
      </div>
    </div>
  );
}
