"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FileText } from "lucide-react";

import { saveLectureProgress } from "@/app/lecture/[lectureId]/actions";

type LecturePlayerProps = {
  lectureId: string;
  title: string;
  description: string;
  videoUrl: string | null;
  notesUrl: string | null;
  initialWatchedSeconds: number;
  initialCompleted: boolean;
};

export function LecturePlayer({
  lectureId,
  title,
  description,
  videoUrl,
  notesUrl,
  initialWatchedSeconds,
  initialCompleted
}: LecturePlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastSavedRef = useRef(initialWatchedSeconds);
  const initialCompletedRef = useRef(initialCompleted);
  const [status, setStatus] = useState(initialCompleted ? "Completed" : "Progress sync ready");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    initialCompletedRef.current = initialCompleted;
  }, [initialCompleted]);

  const persistProgress = useCallback(
    async (video: HTMLVideoElement, force = false, markCompleted = false) => {
      const watchedSeconds = Math.floor(video.currentTime || 0);
      const completed =
        markCompleted ||
        initialCompletedRef.current ||
        Boolean(video.duration && watchedSeconds >= Math.max(video.duration - 10, video.duration * 0.9));

      if (!force && Math.abs(watchedSeconds - lastSavedRef.current) < 10 && !completed) {
        return;
      }

      setIsSaving(true);

      try {
        await saveLectureProgress({
          lectureId,
          watchedSeconds,
          completed
        });

        lastSavedRef.current = watchedSeconds;
        setStatus(completed ? "Progress saved and lecture marked complete" : "Progress saved");
      } catch {
        setStatus("Unable to save progress right now");
      } finally {
        setIsSaving(false);
      }
    },
    [lectureId]
  );

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleLoadedMetadata = () => {
      if (initialWatchedSeconds > 0 && video.currentTime < 1) {
        video.currentTime = initialWatchedSeconds;
      }
    };

    const handlePause = () => {
      void persistProgress(video, true);
    };

    const handleEnded = () => {
      void persistProgress(video, true, true);
    };

    const handleTimeUpdate = () => {
      void persistProgress(video, false);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      void persistProgress(video, true);
    };
  }, [initialWatchedSeconds, persistProgress]);

  return (
    <div className="overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-glow">
      <div className="border-b border-ink/10 px-6 py-5">
        <h1 className="font-heading text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate">{description}</p>
      </div>

      {videoUrl ? (
        <div className="bg-ink p-4">
          <video
            ref={videoRef}
            controls
            preload="metadata"
            className="aspect-video w-full rounded-3xl bg-black"
            src={videoUrl}
          >
            Your browser does not support the video player.
          </video>
        </div>
      ) : (
        <div className="px-6 py-8">
          <div className="rounded-3xl border border-coral/20 bg-coral/10 p-5 text-sm text-coral">
            This lecture does not have a video URL configured yet. You can still open any available notes below.
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal">{status}</p>
          <p className="mt-1 text-sm text-slate">{isSaving ? "Saving your watch progress..." : "Progress sync runs during playback, pause, and completion."}</p>
        </div>
        {notesUrl ? (
          <Link
            href={notesUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/10 px-5 py-3 font-semibold text-ink transition hover:bg-cream"
          >
            <FileText className="h-4 w-4 text-coral" />
            Open Notes PDF
          </Link>
        ) : null}
      </div>
    </div>
  );
}
