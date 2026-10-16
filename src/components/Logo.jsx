export default function Logo({ size = 32 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg bg-black dark:bg-white shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.56}
        height={size * 0.56}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
          fill="white"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="dark:fill-black dark:stroke-black"
        />
      </svg>
    </span>
  );
}
