import React from 'react'
import "../Style/Confirm.css"
import { useConfirm } from './ConfirmContextProvider'

const Confirm: React.FC = () => {
    const { confirm, hideConfirm } = useConfirm();
    return (
        <>
            <div className={"confirm" + ` ${confirm.show ? "active" : ''}` + ` ${confirm.type}`}>
                <p>{confirm.message}</p>
                <div className='btns-container'>
                    <button className='approve' onClick={() => {
                        console.log('YES BUTTON CLICKED IN CONFIRM DIALOG');
                        console.log('onApprove callback:', confirm.onApprove);
                        hideConfirm();
                        confirm.onApprove();
                        console.log('onApprove callback executed');
                    }}>Yes</button>
                    <button className='decline' onClick={() => {
                        console.log('NO BUTTON CLICKED IN CONFIRM DIALOG');
                        hideConfirm();
                        confirm.onDecline();
                    }}>No</button>
                </div>
            </div>
            {confirm.show && <div className='confirm-background'></div>}
        </>
    )
}

export default Confirm