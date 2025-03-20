import type { FC } from 'react';
import { AuthGuard } from '../guards/auth-guard';

export const withAuthGuard = <P extends object>(Component: FC<P>): FC<P> => {
    const WrappedComponent = (props: P) => (
        <AuthGuard>
            <Component {...props} />
        </AuthGuard>
    );
    WrappedComponent.displayName = `withAuthGuard(${Component.displayName || Component.name || 'Component'})`;
    return WrappedComponent;
};
