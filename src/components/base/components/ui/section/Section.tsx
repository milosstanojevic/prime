import * as React from 'react';
interface SectionProps {
    children?: React.ReactNode;
    centered?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, centered = false }) => {
    return (
        <div
            style={{
                ...(centered && { display: 'flex', alignItems: 'center', justifyContent: 'center' })
            }}
        >
            {children}
        </div>
    );
};
