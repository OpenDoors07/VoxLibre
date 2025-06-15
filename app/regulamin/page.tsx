
            ...


export default function RegulaminPage() {
    console.log("✅ RegulaminPage załadowany");

    return (
        <main className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-purple-700">Regulamin korzystania z VoxLibre</h1>

            <section className="space-y-4 text-gray-800 text-sm leading-relaxed">
                <p>
                    Korzystając z platformy <strong>VoxLibre</strong>, akceptujesz poniższe zasady. Naszą misją jest zapewnienie przestrzeni do swobodnego wyrażania opinii,
                    jednak każda wolność niesie za sobą odpowiedzialność.
                </p>

                <h2 className="text-xl font-semibold text-purple-600 mt-6">1. Odpowiedzialność za treści</h2>
                <p>
                    Każdy użytkownik jest w pełni odpowiedzialny prawnie i cywilnie za treści, które publikuje. VoxLibre nie ingeruje w treść postów, chyba że
                    są one jednoznacznie niezgodne z obowiązującym prawem (np. nawoływanie do przemocy, pornografia dziecięca, dane osobowe bez zgody).
                </p>

                <h2 className="text-xl font-semibold text-purple-600 mt-6">2. Moderacja i zgłoszenia</h2>
                <p>
                    VoxLibre nie prowadzi aktywnej moderacji treści, jednak umożliwia użytkownikom zgłaszanie postów rażąco naruszających prawo. Zgłoszenia będą weryfikowane
                    i w razie konieczności przekazywane odpowiednim służbom.
                </p>

                <h2 className="text-xl font-semibold text-purple-600 mt-6">3. Dane użytkowników</h2>
                <p>
                    Nie wymagamy zakładania kont ani podawania danych osobowych. Wszelkie publikacje są anonimowe. Informacje, które mogą identyfikować użytkownika (np. adres IP),
                    nie są przechowywane dłużej niż to konieczne dla bezpieczeństwa serwisu.
                </p>

                <h2 className="text-xl font-semibold text-purple-600 mt-6">4. Zastrzeżenia</h2>
                <p>
                    VoxLibre nie ponosi odpowiedzialności za jakiekolwiek skutki prawne wynikające z publikacji użytkowników. W przypadku otrzymania decyzji organów ścigania,
                    zastrzegamy sobie prawo do usunięcia treści lub współpracy zgodnie z przepisami prawa.
                </p>

                <h2 className="text-xl font-semibold text-purple-600 mt-6">5. Zmiany w regulaminie</h2>
                <p>
                    Regulamin może ulec zmianie. Zaktualizowana wersja będzie dostępna zawsze na tej stronie. Korzystając z platformy po wprowadzeniu zmian, użytkownik akceptuje nowy regulamin.
                </p>
            </section>
        </main>
    );
}




console.log("Strona REGULAMIN działa");

