import type { ElementType, ReactNode } from "react";

import clsx from "clsx";

type PageContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function PageContainer<T extends ElementType = "div">({
  as,
  children,
  className
}: PageContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={clsx("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}>
      {children}
    </Component>
  );
}
