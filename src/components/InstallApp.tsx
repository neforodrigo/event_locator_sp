import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

function isIos() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

export function InstallApp() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hint, setHint] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;
    setVisible(true);

    function onPrompt(event: Event) {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    }

    function onInstalled() {
      setVisible(false);
    }

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!visible) return null;

  async function install() {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === 'accepted') setVisible(false);
      setDeferred(null);
      return;
    }
    setHint((open) => !open);
  }

  return (
    <div className="mb-5 flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={install}
        className="inline-flex items-center gap-2 bg-pkmn-gold text-pkmn-ink font-bold text-sm px-5 py-2 rounded-full shadow-[0_4px_12px_rgba(245,197,24,0.35)] hover:bg-pkmn-gold/90 transition"
      >
        <img src="/app-icon-192.png" alt="" className="w-5 h-5 rounded-[5px]" />
        Instalar app
      </button>
      {hint && (
        <p className="text-white/90 text-xs text-center max-w-sm leading-relaxed">
          {isIos()
            ? 'Toque em Compartilhar e depois em Adicionar à Tela de Início.'
            : 'No celular, abra o Town Map no Chrome ou Safari e use Instalar app ou Adicionar à tela inicial.'}
        </p>
      )}
    </div>
  );
}
