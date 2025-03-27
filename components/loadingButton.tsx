import { Button } from '@/components/ui/button';
import Spinner from '@/components/spinner';
import { ReactNode } from "react";

const LoadingButton = ({
   loading,
   type,
   children,
   onClick,
   disabled,
}: {
    loading: boolean,
    type: 'button' | 'submit' | 'reset';
    children: ReactNode,
    onClick?: () => void,
    disabled?: boolean,
}) => {
    return (
        <Button onClick={onClick} className="w-full" type={type} disabled={disabled || loading}>
            {loading ? (
                <Spinner color={'white'} />
            ) : (
                children
            )}
        </Button>
    )
}

export default LoadingButton;