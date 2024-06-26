"use client"
import { SignIn } from '@/components/Authentication/SignIn';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';

export default function HomePage() {


  return (
    <>
      <SignIn />
    </>
  );
}
