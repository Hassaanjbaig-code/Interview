import { FaSpinner } from 'react-icons/fa';

const Loading = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <FaSpinner className="animate-spin text-4xl" />
            <p className="mt-4 text-lg">{message}</p>
        </div>
    );
};


export default Loading;