import React, { useState } from "react";
import { Button, Card, CardBody, CardTitle, CardSubtitle, CardText, Form, FormGroup, Input, Label } from 'reactstrap';
import './PizzaOrderForm.css'
import Header from "./Header";




export default function PizzaOrderForm({ onSubmitOrder }) {
    const [formData, setFormData] = useState({
        isim: "",
        hamur: "",
        boyut: "",
        malzemeler: [],
        siparisNotu: "",
        adet: 1,
    });

    const [errors, setErrors] = useState({});
    const malzemeListesi = [
        "Pepperoni",
        "Tavuk Izgara",
        "Mısır",
        "Sarımsak",
        "Ananas",
        "Sosis",
        "Soğan",
        "Sucuk",
        "Biber",
        "Kabak",
        "Kanada Jambonu",
        "Domates",
        "Jalapeno",
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                malzemeler: checked
                    ? [...prev.malzemeler, value]
                    : prev.malzemeler.filter((malzeme) => malzeme !== value),
            }))
        } else if (name === "adet") {
            setFormData((prev) => ({
                ...prev,
                adet: Math.max(1, Number(value)),
            }));
        } else if (name === hamur) {
            setFormData((prev) => ({
                ...prev,
                hamur: value,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    const validateForm = () => {
        const newErrors = {};
        if (formData.isim.trim().length < 3) {
            newErrors.isim = "İsim en az 3 karakter olmalıdır.";
        }
        if (!formData.boyut) {
            newErrors.boyut = "Lütfen bir boyut seçin.";
        }
        if (!formData.hamur) {
            newErrors.hamur = "Lütfen bir hamur türü seçin.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmitOrder(formData)
        }


    };


    return (
        <>
            <header>
                <Header />
            </header>
            <header></header>
            <div className="form-container">
                <Form className="pizza-order-form" onSubmit={handleSubmit}>
                    <div className="pizza-name">
                        <h5>Position Absolute Acı Pizza</h5>
                    </div>
                    <div className="pizza-price-rating">
                        <p className="price">85.50₺</p>
                        <p className="rating">4.9 <span>(200)</span></p>
                    </div>
                    <p className=""> Frontend Dev olarak hala position:absolute kullanıyorsan bu pizza tam
                        sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer
                        malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir
                        fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş
                        mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir
                        yemektir. Küçük bir pizzaya bazen pizzeta denir.
                    </p>
                    <div className="size-dough-section">
                        <div className="size-section">
                            <legend>Boyut Seç</legend>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="boyut"
                                        value="Küçük"
                                        onChange={handleChange}
                                    />
                                    Küçük
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="boyut"
                                        value="Orta"
                                        onChange={handleChange}
                                    />
                                    Orta
                                </Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                        type="radio"
                                        name="boyut"
                                        value="Büyük"
                                        onChange={handleChange}
                                    />
                                    Büyük

                                </Label>
                            </FormGroup>
                            {errors.boyut && <p className="error">{errors.boyut}</p>}
                        </div>

                        <div className="dough-section">
                            <legend>Hamur Seç</legend>
                            <FormGroup>
                                <Label htmlFor="hamur"></Label>
                                <Input
                                    type="select"
                                    name="hamur"
                                    id="hamur"
                                    value={formData.hamur}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Hamur Kalınlığı</option>
                                    <option value="İnce">İnce</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Kalın">Kalın</option>
                                </Input>
                            </FormGroup>
                            {errors.hamur && <p className="error">{errors.hamur}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <h5>Ekstra Malzemeler</h5>
                        <p>En fazla 10 malzeme seçebilirsiniz! 5₺</p>
                        <div className="ekstra-malzemeler">
                            {malzemeListesi.map((malzeme, index) => {
                                return (
                                    <FormGroup key={index}>
                                        <Label>
                                            <Input
                                                type="checkbox"
                                                value={malzeme}
                                                onChange={handleChange}
                                                disabled={formData.malzemeler.length >= 10 && !formData.malzemeler.includes(malzeme)}
                                            />
                                            {malzeme}
                                        </Label>
                                    </FormGroup>
                                );
                            })}
                        </div>
                    </div>
                    <div className="form-group">
                        <Label>Sipariş Notu</Label>
                        <Input
                            type="textarea"
                            name="siparisNotu"
                            value={formData.siparisNotu}
                            onChange={handleChange}
                            placeholder="Siparişine eklemek istediğin bir not var mı ?"
                        />
                    </div>
                    <div className="form-group">
                        <Label className="alici-isim">Alıcı  Adı</Label>
                        <Input
                            type="text"
                            name="isim"
                            id="isim"
                            value={formData.isim}
                            onChange={handleChange}
                            placeholder="İsminizi giriniz"
                            required
                        />
                        {errors.isim && <p className="error">{errors.isim}</p>}
                    </div>
                    <div className="form-group">
                        <Label className="adet-secimi-label">Adet</Label>
                        <div className="adet-secimi">
                            <Button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        adet: Math.max(1, prev.adet - 1),
                                    }))
                                }
                            >
                                -
                            </Button>
                            <Input
                                type="number"
                                name="adet"
                                value={formData.adet}
                                onChange={handleChange}
                            />
                            <Button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        adet: prev.adet + 1,
                                    }))
                                }
                            >
                                +
                            </Button>
                        </div>
                    </div>
                    <div className="form-group">
                        <Card
                            color="light"
                            className="card-siparis-ozeti"

                        >

                            <CardBody>
                                <CardTitle className="card-siparis-ozeti-title" tag="h5">
                                    Sipariş Toplamı
                                </CardTitle>
                                <CardText className="card-siparis-ozeti-secimler">
                                    <strong>Seçimler:</strong> {formData.malzemeler.length * 5 || "0"}₺
                                </CardText>
                                <CardText className="card-siparis-ozeti-toplam-fiyat">
                                    <strong>Toplam:</strong> {(85.5 * formData.adet) + (formData.malzemeler.length * 5)} ₺
                                </CardText>
                                <Button color="primary">
                                    SİPARİŞ VER
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                </Form>
            </div>
        </>
    );
}
