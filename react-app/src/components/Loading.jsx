import React from 'react';
import { Spinner } from 'reactstrap';

const Loading = () => {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <Spinner color="primary" />
        </div>
    );
};

export default Loading;