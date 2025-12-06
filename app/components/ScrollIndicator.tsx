import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-10 h-10 text-cyan-400" />
    </div>
  );
}
