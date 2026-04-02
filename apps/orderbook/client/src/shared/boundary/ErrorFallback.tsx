interface ErrorFallbackProps {
  error: Error;
  onReset: () => void;
}

export default function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  return (
    <div>
      <p>오류가 발생했습니다: {error.message}</p>
      <button onClick={onReset}>다시 시도</button>
    </div>
  );
}
