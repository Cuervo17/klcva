"use client";
import styles from '../styles/home.module.css';
import { motion } from "framer-motion";

function Unete() {
    return (
        <div className={`${styles.unete} h-auto md:h-[60vh]`}>
            <p className="pt-8 text-2xl text-center">Únete a nuestra comunidad y disfruta de los beneficios que tenemos para ti.</p>
            <div className="flex flex-col text-black items-center gap-4 mt-4 md:flex-row md:items-stretch">
                <motion.div
                    initial={{ x: -350 }}
                    whileInView={{ x: 0 }}
                    transition={{ ease: "easeOut", duration: 2 }}
                >
                    <div className="text-center text-xl rounded-2xl flex items-center justify-center p-2 bg-[#D9D9D9] w-40 h-40">
                        <p>Procesos de compras 100% confiables</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: -350 }}
                    whileInView={{ x: 0 }}
                    transition={{ ease: "easeOut", duration: 1.5 }}
                >
                    <div className="text-center text-xl rounded-2xl flex items-center justify-center p-2 bg-[#D9D9D9] w-40 h-40">
                        <p>Manejo profesional de tu producto</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: -350 }}
                    whileInView={{ x: 0 }}
                    transition={{ ease: "easeOut", duration: 1 }}
                >
                    <div className="text-center text-xl rounded-2xl flex items-center justify-center p-2 bg-[#D9D9D9] w-40 h-40">
                        Transporte eficiente y seguro
                    </div>
                </motion.div>

                <motion.div
                    initial={{ x: -350 }}
                    whileInView={{ x: 0 }}
                    transition={{ ease: "easeOut", duration: 0.5 }}
                >
                    <div className="text-center text-xl rounded-2xl flex items-center justify-center p-2 bg-[#D9D9D9] w-40 h-40">
                        Almacenamiento acorde a tus necesidades
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default Unete;
