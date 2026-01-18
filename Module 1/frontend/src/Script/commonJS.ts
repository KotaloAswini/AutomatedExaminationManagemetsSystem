// Exported functions kept to prevent breaking imports, but logic is removed as File Saving is out of scope.

export function addWindowCloseEventHandler(confirmPopup: (msg: string) => void, onFailed: (msg: string) => void) {
    // Logic removed
}

export function removeWindowCloseEventHandler() {
    // Logic removed
}

export function checkForSave(callBack = () => { }, confirmPopup: (msg: string, onApprove: () => void, onDecline?: () => void) => void, onFailed: (msg: string) => void) {
    // Logic removed, immediately callback
    callBack();
}