import Link from 'next/link';
import React from 'react'
import { buttonVariants } from './ui/button';
import Image from 'next/image';

function Logo() {
    return (
        <Link
          href={"/dashboard"}
          className={buttonVariants({
            className:
              "hidden md:flex navLink !mb-10 lg:hover:bg-transparent lg:!p-0",
            variant: "ghost",
            size: "default",
          })}
        >
          <Image
            src="/logo.svg"
            alt="pixelgram logo"
            className="dark:invert lg:hidden"
            width={50}
            height={50}
          />
          <p className={`font-semibold text-xl hidden lg:block`}>
            Pixelgram
          </p>
        </Link>
    );
}

export default Logo