interface ErrorFallbackProps {
  errorMessage: string;
  onReset: () => void;
}

export default function ErrorFallback({ errorMessage, onReset }: ErrorFallbackProps) {
  return (
    <div>
      <p>오류가 발생했습니다: {errorMessage}</p>
      <button onClick={onReset}>다시 시도</button>
    </div>
  );
}
