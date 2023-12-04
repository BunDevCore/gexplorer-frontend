import {RefObject, useEffect} from "react";

const useOutside = (ref: RefObject<any> | RefObject<any>[], fun: Function) => {
    useEffect(() => {
        function handleClickOutside(event: Event) {
            // needed to use !Array.isArray(ref) because compiler angy at me :(
            if ((Array.isArray(ref) && !ref?.some((v) => v.current?.contains(event.target))) ||
                (!Array.isArray(ref) && !ref?.current?.contains(event.target))) {
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