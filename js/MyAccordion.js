import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

function MyAccordion() {
	return (
	    <Accordion>
	        <AccordionItem>
	            <AccordionItemTitle>
	                <h3>Simple title</h3>
	            </AccordionItemTitle>
	            <AccordionItemBody>
	                <p>Body content</p>
	            </AccordionItemBody>
	        </AccordionItem>
	        <AccordionItem>
	            <AccordionItemTitle>
	                <h3>Complex title</h3>
	                <div>With a bit of description</div>
	            </AccordionItemTitle>
	            <AccordionItemBody>
	                <p>Body content</p>
	            </AccordionItemBody>
	        </AccordionItem>
	    </Accordion>
	)
} 

export default MyAccordion;