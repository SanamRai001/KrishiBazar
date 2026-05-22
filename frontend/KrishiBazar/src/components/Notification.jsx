import { useNotification } from '../hooks/useNotification'
const Notification = () => {

    const { message, type, visible } = useNotification();

    if(!visible) return null;

    const styles =
      type === "pass"
        ? "border-green-500  text-green-700"
        : "border-red-500  text-red-700";

    return (
        <div
          className={`rounded-lg border z-50 ${styles} notification`}
        >
            {message}
        </div>
    )
}

export default Notification