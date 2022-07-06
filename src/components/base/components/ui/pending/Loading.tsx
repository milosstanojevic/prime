import React from 'react';
import ContentLoader from 'react-content-loader';

export const Loading: React.FC = () => {
    return (
        <ContentLoader viewBox="0 0 400 160" height={20} width={100} backgroundColor="transparent">
            <circle cx="110" cy="86" r="30" />
            <circle cx="174" cy="86" r="30" />
            <circle cx="238" cy="86" r="30" />
        </ContentLoader>
    );
};
