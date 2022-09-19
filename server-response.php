<!DOCTYPE html>

<head>
        <meta http-equiv="Content-Type" content="text/html" charset="UTF-8">
        <link href="resources/style-sheets/server-response-style.css" rel="stylesheet">
</head>
<?php
        //Uses a switch an if..else statments to determines the school fess that need to be paid.
        function calculateFees($num_of_children,$payment_type,$price)
        {
                $subtotal = $num_of_children*$price;

                switch($num_of_children)
                {
                        case 1:
                                if($payment_type == "yearly")
                                {
                                        return (1 - 0.1)*$subtotal;
                                }
                                else
                                {
                                        return (1 - 0)*$subtotal;
                                }
                        case 2:
                                if($payment_type == "yearly")
                                {
                                        return (1 - 0.12)*$subtotal;
                                }
                                else
                                {
                                        return (1 - 0.01)*$subtotal;
                                }
                        case 3:
                                if($payment_type == "yearly")
                                {
                                        return (1 - 0.13)*$subtotal;
                                }
                                else
                                {
                                        return (1 - 0.0125)*$subtotal;
                                }
                        case 4:
                                if($payment_type == "yearly")
                                {
                                        return (1 - 0.14)*$subtotal;
                                }
                                else
                                {
                                        return (1 - 0.015)*$subtotal;
                                }
                        default:
                                if($payment_type == "yearly")
                                {
                                        return (1 - 0.14)*$subtotal;
                                }
                                else
                                {
                                        return (1 - 0.015)*$subtotal;
                                }

                }
        }
?>
<?php
        $first_name = $_POST["first_name"];
        $last_name = $_POST["last_name"];
        $street_add = $_POST["street_name"];
        $complex_add = $_POST["complex_add"];

        $suburb_add = $_POST["suburb_add"];
        $town_add = $_POST["town_add"];
        $postal_code = $_POST["postal_code"];
        $email_add = $_POST["email_address"];
        $phone_num = $_POST["phone_number"];
        $payment_type = $_POST["payment_type"];

        $price;
        $type;

        if($payment_type == "yearly")
        {
                $price = 12000;
                $type = " per year.";
        }
        else
        {
                $price = 1000;
                $type = " per month.";
        }

        $no_of_children = intval($_POST["no_of_children"]);
        $extra_array = $_POST["extra"];
        $day = $_POST["input_day"];
        $month = $_POST["input_month"];
        $year = $_POST["input_year"];

        if($complex_add != "")
        {
                $complex_add = $complex_add."<br>";
        }

        $grand_total = CalculateFees($no_of_children,$payment_type,$price);
        $grand_total = round($grand_total,2);

        $extra_cirricular = "";

        for($i = 0; $i < count($extra_array); $i++)
        {
                $extra_cirricular .= $extra_array[$i]."<br>";
        }
?>
<?php
        $HTML = 
        "<body>
        <!-- Wrapper division that contains all the elements on the page. -->
        <div id=\"wrapper\">
                <!-- Page header division that contains the logo and the heading of the letter. -->
                <div id=\"document-head\">
                        <!-- Division containing the logo of the school. -->
                        <div id=\"logo-head\">
                                <img src=\"resources/images/school-logo.jpg\" width=\"100\" height=\"100\" class=\"right\">
                        </div>
                        
                        <!-- Divsion containing the title of the letter. -->
			<div id=\"heading\">
                                <h1>School Fees Quote</h1>
			</div>
                </div>
                        <p>
                                Quote for date: $day-$month-$year
                        </p>

                        <!-- Paragraph containing the full name of the account holder. -->
                        <p>
                                Name:$first_name <br> Last Name: $last_name
                        </p>

                        <!-- Paragraph containing the address of the account holder. -->
                        <p>Address:<br>
                                $street_add<br>
                                $complex_add
                                $suburb_add<br>
                                $town_add<br>
                                $postal_code<br>
                        </p>

                        <!-- Paragraph containing the contact details of the account holder. -->
                        <p>Contact Details:<br>
                                Contact number: $phone_num<br>
                                Email: $email_add<br>
                        </p>

                        <!-- Paragraph containing the extra-murals that where selected. -->
                        <p>Extra-curricular Activities:<br>
                                $extra_cirricular
                        </p>

                        <!-- The cost of the school fees. -->
                        <p>
                                Grand Total: R $grand_total $type
                        </p>

                </div>
        </body>";

        echo $HTML;      
?>
