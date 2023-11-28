import {RefObject, useEffect} from "react";

const useOutside = (ref: RefObject<any>, fun: Function) => {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            if (!ref?.current?.contains(event.target)) {
                fun();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [fun, ref]);
}

export default useOutside;