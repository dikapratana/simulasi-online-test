import { getUserData } from "../../../../utils/storage";
import { twMerge } from "../../../../utils/tw-merge";

type HeaderFragemntProps = {
  step: number;
  elapsedSeconds?: number;
};

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const padded = (value: number) => String(value).padStart(2, "0");
  if (hours > 0)
    return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
  return `${padded(minutes)}:${padded(seconds)}`;
}

function formatDate(value?: string) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function HeaderFragment({
  step,
  elapsedSeconds,
}: HeaderFragemntProps) {
  const userData = getUserData();
  const dataStep = [
    {
      title: "Student",
      subTitle: "Profile",
    },
    {
      title: "Question",
      subTitle: "(1-6)",
    },
    {
      title: "Question",
      subTitle: "(7-12)",
    },
    {
      title: "Question",
      subTitle: "(13-18)",
    },
    {
      title: "Question",
      subTitle: "(19-24)",
    },
    {
      title: "Writing",
      subTitle: "task",
    },
  ];

  return (
    <>
      {userData && step >= 2 && typeof elapsedSeconds === "number" && (
        <div className="flex flex-col items-center mb-8 text-base font-medium">
          <h4>Time to work {formatDuration(elapsedSeconds)}</h4>
          <h4>Date {formatDate(userData?.created_at)}</h4>
        </div>
      )}
      <div className="flex items-center justify-center">
        {dataStep.map((item, key) => {
          const number = key + 1;
          const beforeActive = step >= number && number > 1;
          const afterActive = step > number && number < dataStep.length;

          return (
            <div
              key={key}
              className={twMerge(
                "flex items-center w-full",
                beforeActive
                  ? "before:left-0 before:top-0 before:w-full before:h-1 before:bg-blue-100"
                  : "before:left-0 before:top-0 before:w-full before:h-1 before:bg-neutral-1",
                afterActive
                  ? "after:left-0 after:top-0 after:w-full after:h-1 after:bg-blue-100"
                  : "after:left-0 after:top-0 after:w-full after:h-1 after:bg-neutral-1",
              )}
            >
              <div>
                <div
                  className={twMerge(
                    "h-12 w-12 text-lg font-medium  rounded-full justify-center items-center flex",
                    step >= number
                      ? "bg-blue-100 text-blue-500"
                      : "bg-neutral-100 text-neutral-800",
                  )}
                >
                  {number}
                </div>
              </div>
              <div
                className={twMerge(
                  "text-sm font-medium mx-2",
                  step >= number ? "text-blue-500 " : " text-neutral-800",
                )}
              >
                <h1>{item.title}</h1>
                <p>{item.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
