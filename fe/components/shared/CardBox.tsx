"use client";

import React from "react";
import { Card } from "flowbite-react";

interface MyAppProps {
  children: React.ReactNode;
  className?: string;
}

const CardBox: React.FC<MyAppProps> = ({ children, className }) => {
  return (
    <Card
      className={`card ${className} 'dark:shadow-dark-md shadow-md' `}
      style={{
        borderRadius: `24px`,
      }}
    >
      {children}
    </Card>
  );
};

export default CardBox;
