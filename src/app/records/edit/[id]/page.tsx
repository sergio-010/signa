import { getBrand } from "@/app/actions";
import Form from "../../create/components/Form";

export default async function EditBrandPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    const { brand, error } = await getBrand(Number(id));

    if (!brand || error) {
        return (
            <div>
                <h1>{error || "No se encontró la marca"}</h1>
            </div>
        );
    }

    return (
        <div>
            <Form
                isEditing
                brandData={brand}
            />
        </div>
    );
}
