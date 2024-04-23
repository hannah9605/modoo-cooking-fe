"use client";

import style from "./login.module.css";
import {
  ChangeEventHandler,
  FormEventHandler,
  useState,
  useEffect,
} from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn, getProviders, useSession } from "next-auth/react";

type ProviderNameType = "google" | "naver" | 'kakao"';
type ProviderType = {
  providers: Record<
    ProviderNameType,
    {
      id: string;
      name: string;
      type: string;
      signinUrl: string;
      callbackUrl: string;
    }
  >;
};

export default function LoginModal() {
  const [providers, setProviders] = useState<ProviderType | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const onClickClose = () => {
    router.back();
  };
  if (session) {
  }
  console.log(providers);

  const handleSocialLogin = async (providerId: string) => {
    const result = await signIn(providerId, {
      redirect: true,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const providersData: any = await getProviders();
      setProviders(providersData);
    };

    fetchData();
  }, []);
  return (
    <>
      {providers && (
        <div className={style.modalBackground}>
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <button className={style.closeButton} onClick={onClickClose}>
                <svg
                  width={24}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                  </g>
                </svg>
              </button>
              <div>로그인하세요.</div>
            </div>

            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <div key={provider.id}>
                    <button onClick={() => handleSocialLogin(provider.id)}>
                      {provider.name} 로그인
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}
