const OhmsDescription = () =>{
    return(
        <div className="bg-white p-6 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 ">
        <div className="flex-1 order-2 md:order-1 space-y-6">
            <div>
            <h2 className="text-2xl font-bold mt-4 md:mt-0 mb-4">Ohm's Law</h2>
            <p className="text-gray-600 mb-4">
                Ohm's Law is a fundamental principle in electrical physics that explains the relationship between voltage (V), electric current (I), and resistance (R) in an electrical circuit. Discovered by Georg Simon Ohm in 1827, this law states that the electric current flowing through a material is directly proportional to the voltage applied and inversely proportional to the material's resistance. Simply put, the greater the resistance, the lower the current flow, and vice versa. Ohm's Law is essential for understanding and designing various electronic devices and electrical systems.
            </p>
            </div>
            <div>
            <h3 className="text-xl font-semibold mb-4">Formulas</h3>
            <ul className="space-y-2 text-gray-600">
                <li>V = IR (Ohm's Law)</li>
                <li>Series: Rtotal = R1 + R2</li>
                <li>Parallel: 1/Rtotal = 1/R1 + 1/R2</li>
            </ul>
            </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-start">
            <img src="georgohm.jpg" alt="Georg Ohm" className="w-48 h-48 rounded-lg object-cover" />
        </div>
    </div>
    );
}

export default OhmsDescription;