import { useNotification } from '../hooks/useNotification'
const Notification = () => {

    const { message, type, visible } = useNotification();

    if(!visible) return null;

    const styles =
      type === "pass"
        ? "border-green-500 bg-green-50 text-green-700"
        : "border-red-500 bg-red-50 text-red-700";

    return (
        <div
          className={`rounded-lg border shadow-md z-50 ${styles}`}
        >
            {message}
        </div>
    )
}

export default Notification