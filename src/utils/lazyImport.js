import {lazy} from "react";

const lazyImport = (module, delay = 0) =>
    lazy(() =>
        new Promise(resolve =>
            setTimeout(() => resolve(import('../' + module)), delay)
        )
    )

export default lazyImport;
