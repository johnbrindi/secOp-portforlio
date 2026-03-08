export default function ScrollIndicator() {
  return (
    <div className="flex justify-center" aria-hidden>
      <div
        className="w-px"
        style={{
          height: "clamp(32px, 5vw, 56px)",
          background: "linear-gradient(to bottom, var(--border-hi), transparent)",
        }}
      />
    </div>
  );
}
