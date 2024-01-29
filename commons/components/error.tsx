"use client";

import { Skeleton } from "@/commons/components/ui/skeleton";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Suspense, useTransition } from "react";
import Loading from "./loading";
import { Button } from "./ui/button";

export default function ErrorBoundary({ error }: { error: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <Suspense fallback={<Loading />}>
      <Skeleton className=" h-72 w-full items-center justify-center flex flex-col gap-x-2 space-y-3 animate-none">
        <div className="flex flex-col items-center gap-x-3 ">
          <div className="flex flex-row gap-x-2 items-center">
            <ExclamationTriangleIcon className="h-4 w-4" />
            Something Went Wrong
            <hr />
          </div>
          <div className="p-3 text-xs bg-slate-700/20 text-gray-700 text-center w-1/2 container font-mono rounded-md ">
            {error}
          </div>
        </div>
        <div>
          <form
            action={() => {
              onSubmit();
            }}
          >
            <Button
              disabled={isPending}
              variant="outline"
              type="submit"
              className="w-full"
              size="sm"
            >
              {isPending ? (
                <div className="flex items-center">
                  <ReloadIcon className="animate-spin h-3 w-3 mr-2 " />
                  Reloading
                </div>
              ) : (
                <div className="flex items-center">
                  <ReloadIcon className=" h-3 w-3 mr-2 " />
                  Reload
                </div>
              )}
            </Button>
          </form>
        </div>
      </Skeleton>
    </Suspense>
  );
}
