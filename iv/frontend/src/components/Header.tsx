import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Trophy, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Header() {
  const { identity, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    toast.success('Logged out successfully');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              IVirtualz
            </h1>
            <p className="text-xs text-muted-foreground">Virtual Premier League</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && (
            <>
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {identity.getPrincipal().toString().slice(0, 8)}...
                </span>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                disabled={isLoggingIn}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
