import editIcon from "../../assets/edit_icon.svg"

export default function QuizTableBody (props) {

    const {data, onEdit} = props;

    if (!data) {
        return null
    }


    return (
        data.map(({id, title, description, created}) => {
            const data = new Date(created);
            const year = data.getFullYear();
            const month = data.getMonth() < 10 ? "0" + data.getMonth() : data.getMonth();
            const day = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
             return (
                 <tr key={id}>
                     <td>{id}</td>
                     <td>{title}</td>
                     <td>{description}</td>
                     <td>{`${year} / ${month} / ${day}`}</td>
                     <td>
                         <img src={editIcon} alt="edit" onClick={() => onEdit(id)}/>
                     </td>
                 </tr>
             )
        })
    )
}