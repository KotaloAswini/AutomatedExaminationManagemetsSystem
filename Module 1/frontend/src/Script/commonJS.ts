// Exported functions kept to prevent breaking imports, but logic is removed as File Saving is out of scope.

export function addWindowCloseEventHandler(_confirmPopup: (msg: string) => void, _onFailed: (msg: string) => void) {
    // Logic removed
}

export function removeWindowCloseEventHandler() {
    // Logic removed
}

export function checkForSave(callBack = () => { }, _confirmPopup: (msg: string, onApprove: () => void, onDecline?: () => void) => void, _onFailed: (msg: string) => void) {
    // Logic removed, immediately callback
    callBack();
}