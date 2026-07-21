import './Modal.css'

export const Modal = ({ ModalBody }: { ModalBody: React.ComponentType }) => {
    return <>
        {/* <!-- The Modal --> */}
        <div className="modal">
            {/* <!-- Modal content --> */}
            <div className="modal-content">
                <span className="close">&times;</span>
                <ModalBody />
            </div>

        </div>
    </>
}