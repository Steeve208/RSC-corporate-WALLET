import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetTime: number; // Unix timestamp en segundos
  onComplete?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function CountdownTimer({ targetTime, onComplete }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!targetTime || targetTime === 0) {
      setIsComplete(true);
      return;
    }

    const calculateTimeLeft = (): TimeLeft => {
      const now = Math.floor(Date.now() / 1000);
      const difference = targetTime - now;

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          total: 0,
        };
      }

      return {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference % (60 * 60 * 24)) / (60 * 60)),
        minutes: Math.floor((difference % (60 * 60)) / 60),
        seconds: difference % 60,
        total: difference,
      };
    };

    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0 && !isComplete) {
        setIsComplete(true);
        if (onComplete) {
          onComplete();
        }
      }
    };

    // Actualizar inmediatamente
    updateTimer();

    // Actualizar cada segundo
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetTime, onComplete, isComplete]);

  if (isComplete || timeLeft.total <= 0) {
    return (
      <div className="rsk-countdown rsk-countdown--complete">
        <Clock size={20} />
        <span>Tiempo finalizado</span>
      </div>
    );
  }

  return (
    <div className="rsk-countdown">
      <Clock size={20} className="rsk-countdown-icon" />
      <div className="rsk-countdown-grid">
        <div className="rsk-countdown-item">
          <div className="rsk-countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="rsk-countdown-label">Días</div>
        </div>
        <div className="rsk-countdown-separator">:</div>
        <div className="rsk-countdown-item">
          <div className="rsk-countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="rsk-countdown-label">Horas</div>
        </div>
        <div className="rsk-countdown-separator">:</div>
        <div className="rsk-countdown-item">
          <div className="rsk-countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="rsk-countdown-label">Min</div>
        </div>
        <div className="rsk-countdown-separator">:</div>
        <div className="rsk-countdown-item">
          <div className="rsk-countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="rsk-countdown-label">Seg</div>
        </div>
      </div>
    </div>
  );
}



