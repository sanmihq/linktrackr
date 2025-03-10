import React from "react";

interface PageContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PageContent({
  title,
  description,
  children,
}: PageContentProps) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-6 px-4 text-center">
      <div>
        <h1 className="w-96 text-2xl font-bold md:w-full mx-auto md:text-3xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 text-sm text-gray-600 md:w-9/12 md:text-base">
          {description}
        </p>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}
