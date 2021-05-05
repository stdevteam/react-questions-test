import Table from "./components/Table";
import QuizTableBody from "./components/QuizTableBody";
import Modal from "./components/Modal";
import {useEffect, useState} from "react";
import QuizForm from "./components/QuizForm";
import {request} from "./helpers/request";

function App() {

    const headings = [
        "id",
        "title",
        "description",
        "created",
        ""
    ]

    const initialQuizFormData = {
        mode: "create",
        show: false,
        selectedId: null
    }

    const [data, setData] = useState(null);
    const [showQuizForm, setShowQuizForm] = useState(initialQuizFormData)

    useEffect(() => {
        (async () => {
            const data = await request("/quiz", "GET")
            setData(data);
        })()
    }, [])

  return (
    <div className="container">

        <Modal
            show={showQuizForm.show}
            title={showQuizForm.mode === "create" ? "Create New Quiz" : "Edit Quiz"}
            onClose={() => setShowQuizForm(initialQuizFormData)}
        >
            <QuizForm
                editData={data ? data.find(({id}) => id === showQuizForm.selectedId) : null}
                editIndex={showQuizForm.selectedId}
                onClose={() => setShowQuizForm(initialQuizFormData)}
                setData={setData}
                data={data}
            />
        </Modal>

        <Table
            headings={headings}
            onCreate={() => setShowQuizForm({
                mode: "create",
                show: true,
                selectedId: null
            })}
            data={data}
            tableBody={
                <QuizTableBody
                    data={data}
                    onEdit={(id) => setShowQuizForm({
                        mode: "edit",
                        show: true,
                        selectedId: id
                    })}
                />
            }
        />

    </div>
  );
}

export default App;
