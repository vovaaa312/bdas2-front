import HomePageService from "./services/HomePageService.tsx";
import {useEffect, useState} from "react";

const HomePage = () => {
    const homePageService = new HomePageService();


    const [availableBedsChirurgie, setAvailableBedsChirurgie] = useState<number | null>(null);
    const [availableBedsKardiologie, setAvailableBedsKardiologie] = useState<number | null>(null);
    const [availableBedsOcni, setAvailableBedsOcni] = useState<number | null>(null);
    const [availableBedsOnkologie, setAvailableBedsOnkologie] = useState<number | null>(null);
    const [availableBedsPsychiatrie, setAvailableBedsPsychiatrie] = useState<number | null>(null);

    const fetchAvailableBeds = (departmentId: number, setter: (value: number | null) => void) => {
        homePageService
            .getAvailableBedsInDepartment(departmentId)
            .then((response) => {
                // Устанавливаем значение доступных койкокапелек
                setter(response.data);
            })
            .catch((error) => {
                console.error("Error while fetching beds: ", error);
            });
    };

    useEffect(() => {
        const departmentIds = [
            70000,      //Chirurgie
            70001,      //Kardiologie
            70002,      //Ocni
            70020,      //Onkologie
            70004       //Psychiatrie
        ];
        departmentIds.forEach((departmentId) => {
            switch (departmentId) {
                case 70000:
                    fetchAvailableBeds(departmentId, setAvailableBedsChirurgie);
                    break;
                case 70001:
                    fetchAvailableBeds(departmentId, setAvailableBedsKardiologie);
                    break;
                case 70002:
                    fetchAvailableBeds(departmentId, setAvailableBedsOcni);
                    break;
                case 70020:
                    fetchAvailableBeds(departmentId, setAvailableBedsOnkologie);
                    break;
                case 70004:
                    fetchAvailableBeds(departmentId, setAvailableBedsPsychiatrie);
                    break;
                default:
                    break;
            }
        });
    }, []);

    const descr = () => {
        return <div className="col-md-12">
            <h2 className="text-center">O nás</h2>
            <p className="text-center">
                Naše nemocnice poskytuje vysoce kvalitní lékařské služby
                pomocí moderního vybavení a vysoce kvalifikovaných
                personál.
            </p>
        </div>
    }
    const naseSluzby = () => {
        return <div className="col-md-6">
            <h2>Naše služby</h2>
            <ul>
                <li>Rezervace lůžka pacienta</li>
                <li>Provádění analýz</li>
                <li>Objednávání schůzek pro pacienty a zaměstnanci</li>
            </ul>
        </div>
    }
    const chirurgie = () => {
        return <div className="col-md-6">
            <h2>Chirurgie</h2>
            <p>Na chirurgickém oddělení naší nemocnice pracují výhradně
                kvalifikovaní chirurgové, přední odborníci ve svém oboru.
                Pomocí nejnovějších technologií a inovativních metod
                zachraňují životy a vracejí zdraví našim pacientům každý den.
            </p>
            <ul>
                {availableBedsChirurgie !== null && (
                    <li>Dostupných lůžek v oddělení: {availableBedsChirurgie}</li>

                )}
                <li>Informace oddeleni 'Chirurgie'</li>
                <li>Informace oddeleni 'Chirurgie'</li>
            </ul>
        </div>
    }
    const kardiologie = () => {
        return <div className="col-md-6">
            <h2>Kardiologie</h2>
            <p>
                Naše kardiologické oddělení je hrdé na to, že má přední
                kardiology s hlubokými znalostmi a bohatými zkušenostmi.
                Zajišťují vysoce kvalitní léčbu srdečních chorob pomocí
                pokročilých technik a individuálního přístupu ke každému
                pacientovi.

            </p>
            <ul>
                {availableBedsKardiologie !== null && (
                    <li>Dostupných lůžek v oddělení: {availableBedsKardiologie}</li>

                )}
                <li>Informace oddeleni 'Kardiologie'</li>
                <li>Informace oddeleni 'Kardiologie'</li>
            </ul>
        </div>
    }
    const ocni = () => {
        return <div className="col-md-6">
            <h2>Ocni</h2>
            <p>
                Naše oční oddělení zaměstnává vysoce kvalifikované odborníky
                s významnými zkušenostmi v oblasti očních chorob.
                Používají moderní techniky a vybavení pro diagnostiku a
                léčbu a poskytují našim pacientům tu nejlepší péči o zrak.
            </p>
            <ul>
                {availableBedsOcni !== null && (
                    <li>Dostupných lůžek v oddělení: {availableBedsOcni}</li>

                )}
                <li>Informace oddeleni 'Ocni'</li>
                <li>Informace oddeleni 'Ocni'</li>
            </ul>
        </div>
    }
    const onkologie = () => {
        return <div className="col-md-6">
            <h2>Onkologie</h2>
            <p>
                Na onkologickém oddělení naší nemocnice pracují přední
                odborníci s bohatými zkušenostmi s léčbou nádorových
                onemocnění. Používají inovativní léčbu a osobní přístup,
                aby každému pacientovi poskytli tu nejlepší možnou péči.
            </p>
            <ul>
                {availableBedsOnkologie !== null && (
                    <li>Dostupných lůžek v oddělení: {availableBedsOnkologie}</li>

                )}
                <li>Informace oddeleni 'Onkologie'</li>
                <li>Informace oddeleni 'Onkologie'</li>
            </ul>
        </div>
    }
    const psychiatrie = () => {
        return <div className="col-md-6">
            <h2>Psychiatrie</h2>
            <p>
                Naše psychiatrické oddělení zaměstnává vynikající odborníky,
                kteří kombinují hluboké znalosti psychiatrie s moderními
                léčebnými metodami. Věnují se poskytování soucitné a
                účinné péče zaměřené na zlepšení duševního zdraví a
                pohody každého pacienta.
            </p>
            <ul>
                {availableBedsPsychiatrie !== null && (
                    <li>Dostupných lůžek v oddělení: {availableBedsPsychiatrie}</li>

                )}
                <li>Informace oddeleni 'Psychiatrie'</li>
                <li>Informace oddeleni 'Psychiatrie'</li>
            </ul>
        </div>
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Vítejte v naší nemocnici</h1>
            <p className="lead text-center">
                Staráme se o vaše zdraví a pohodu.
            </p>
            <div className="align-content-center">

                {descr()}

                {naseSluzby()}

                {chirurgie()}

                {kardiologie()}

                {ocni()}

                {onkologie()}

                {psychiatrie()}
            </div>
        </div>
    );
};

export default HomePage;
