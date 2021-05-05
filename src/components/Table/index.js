import Button from "../Button";
import "./table.scss"

export default function Table (props) {

    const {headings, tableBody, onCreate, data} = props;

    return (
        <div className={"table-container"}>
            <Button title={"Add New Quiz"} onClick={onCreate}/>

            {
                data && data.length ? (
                    <table className={"table"}>
                        <thead>
                        <tr>
                            {
                                headings.map((head, key) => (
                                    <th key={`${head}-${key}`}>{head}</th>
                                ))
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {tableBody}
                        </tbody>
                    </table>
                ) : <h2>Please Add Quizzes</h2>
            }

        </div>
    )
}