import HomePageService from "./services/HomePageService.tsx";
import {useEffect, useState} from "react";
import PacientAnalyzaService from "./services/PacientAnalyzaService.tsx";

const HomePage = () => {
    const homePageService = new HomePageService();

    const [availableBedsChirurgie, setAvailableBedsChirurgie] = useState<number | null>(null);
    const [availableBedsKardiologie, setAvailableBedsKardiologie] = useState<number | null>(null);
    const [availableBedsOcni, setAvailableBedsOcni] = useState<number | null>(null);
    const [availableBedsOnkologie, setAvailableBedsOnkologie] = useState<number | null>(null);
    const [availableBedsPsychiatrie, setAvailableBedsPsychiatrie] = useState<number | null>(null);

    //const [oddeleniScore, setOddeleniScore] = useState<OddeleniScore[]>([]);
    const [scoreChirurgie, setScoreChirurgie] = useState<number | null>(null);
    const [scoreKardiologie, setScoreKardiologie] = useState<number | null>(null);
    const [scoreOcni, setScoreOcni] = useState<number | null>(null);
    const [scoreOnkologie, setScoreOnkologie] = useState<number | null>(null);
    const [scorePsychiatrie, setScorePsychiatrie] = useState<number | null>(null);

    const [dobaChirurgie, setDobaChirurgie] = useState<number | null>(null);
    const [dobaKardiologie, setDobaKardiologie] = useState<number | null>(null);
    const [dobaOcni, setDobaOcni] = useState<number | null>(null);
    const [dobaOnkologie, setDobaOnkologie] = useState<number | null>(null);
    const [dobaPsychiatrie, setDobaPsychiatrie] = useState<number | null>(null);

    const fetchAverageStayDuration = (departmentId: number, setter: (value: number | null) => void) => {
        homePageService
            .getAverageStayDuration(departmentId)
            .then((response) => {
                setter(response.data);
            })
            .catch((error) => {
                console.error("Error while fetching avg duration: ", error);
            });
    };
    const fetchAvailableBeds = (departmentId: number, setter: (value: number | null) => void) => {
        homePageService
            .getAvailableBedsInDepartment(departmentId)
            .then((response) => {
                setter(response.data);
            })
            .catch((error) => {
                console.error("Error while fetching beds: ", error);
            });
    };

    useEffect(() => {
        PacientAnalyzaService.vypocitatScoreZdraviOddeleni()
            .then(response => {
                const data = response.data;

                const chirurgieData = data.find(dept => dept.NAZEV_ODDELENI === "Chirurgie");
                if (chirurgieData) {
                    setScoreChirurgie(chirurgieData.PRUM_ZDRAV_SKORE);
                }
                const kardiologieData = data.find(dept => dept.NAZEV_ODDELENI === "Kardiologie");
                if (kardiologieData) {
                    setScoreKardiologie(kardiologieData.PRUM_ZDRAV_SKORE);
                }
                const ocniData = data.find(dept => dept.NAZEV_ODDELENI === "Ocni");
                if (ocniData) {
                    setScoreOcni(ocniData.PRUM_ZDRAV_SKORE);
                }
                const onkologieData = data.find(dept => dept.NAZEV_ODDELENI === "Chirurgie");
                if (onkologieData) {
                    setScoreOnkologie(onkologieData.PRUM_ZDRAV_SKORE);
                }
                const psychiatrieData = data.find(dept => dept.NAZEV_ODDELENI  === "Chirurgie");
                if (psychiatrieData) {
                    setScorePsychiatrie(psychiatrieData.PRUM_ZDRAV_SKORE);
                }

            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);
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
                    fetchAverageStayDuration(departmentId, setDobaChirurgie);
                    break;
                case 70001:
                    fetchAverageStayDuration(departmentId, setDobaKardiologie);
                    break;
                case 70002:
                    fetchAverageStayDuration(departmentId, setDobaOcni);
                    break;
                case 70020:
                    fetchAverageStayDuration(departmentId, setDobaOnkologie);
                    break;
                case 70004:
                    fetchAverageStayDuration(departmentId, setDobaPsychiatrie);
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
                <li>Průměrný skór zdraví: {scoreChirurgie}</li>
                <li>Průměrná doba pobytu: {dobaChirurgie}</li>
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
                <li>Průměrný skór zdraví: {scoreKardiologie}</li>
                <li>Průměrná doba pobytu: {dobaKardiologie}</li>
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
                <li>Průměrný skór zdraví: {scoreOcni}</li>
                <li>Průměrná doba pobytu: {dobaOcni}</li>
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
                <li>Průměrný skór zdraví: {scoreOnkologie}</li>
                <li>Průměrná doba pobytu: {dobaOnkologie}</li>
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
                <li>Průměrný skór zdraví: {scorePsychiatrie}</li>
                <li>Průměrná doba pobytu: {dobaPsychiatrie}</li>
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
