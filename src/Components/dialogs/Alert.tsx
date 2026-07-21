import './Alert.css';

export const Alert = ({ ChildElement, callback }: {
    ChildElement: React.ReactNode,
    callback?: () => void
}) => {
    const handleOk = async () => {
        if (callback) callback();
    }

    return <>
        <div className="alert">
            <table>
                <tbody>
                    <tr>
                        <td colSpan={2}>
                            {ChildElement}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ width: '70%' }}></td>
                        <td className="alert-btn-align">
                            <button className="alert-btn" onClick={handleOk}>Ok</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}