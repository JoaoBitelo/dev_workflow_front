"use client";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/GenericAlert";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

function PaymentMethod() {
    return (
        <div className="flex items-center gap-3 mt-4">
            <svg width="40" height="40" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                    d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                    fill="#FC6020"
                />
            </svg>
            <div>
                <p className="text-gray-800 dark:text-white/90 font-medium">**** **** **** 1234</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Próximo pagamento: 7 de setembro de 2025</p>
            </div>
        </div>
    );
}

export default function Page() {
    const router = useRouter();
    const failureModal = useModal();

    const handleManageButton = async () => {
        router.push("/payment-management");
    };

    return (
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Detalhes da assinatura" />
            <div className="space-y-6 max-w-2xl mx-auto">
                <ComponentCard title="Pagamento">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Plano Padrão</h3>
                    <PaymentMethod />
                    <div className="flex justify-between mt-4">
                        <Button size="sm" onClick={handleManageButton}>
                            Gerenciar assinatura
                        </Button>

                        <Button size="sm" variant="danger" onClick={failureModal.toggleModal}>
                            Cancelar assinatura
                        </Button>
                    </div>
                </ComponentCard>
            </div>
            <Alert
                isOpen={failureModal.isOpen}
                onClose={failureModal.closeModal}
                title="Cuidado!"
                description="Você tem certeza de que deseja cancelar sua assinatura?"
                variant="danger"
                cancel
            />
        </div>
    );
}
