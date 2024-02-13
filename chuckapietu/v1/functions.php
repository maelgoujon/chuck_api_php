<?php
function getFacts($conn)
{
    $sql = "SELECT * FROM chuckn_facts";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } else {
        return ["aucune donnée trouvée."];
    }
}

function getFactById($id, $conn)
{
    $stmt = $conn->prepare("SELECT * FROM chuckn_facts WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        return $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
    } else {
        return ["message" => "Aucune donnée trouvée"];
    }
}



function addFact($data, $conn)
{
    try {
        // Prepare the insert statement with placeholders
        $stmt = $conn->prepare('INSERT INTO chuckn_facts (phrase, vote, date_ajout, faute, signalement) VALUES (:phrase, :vote, now(),  :faute, :signalement)');
        $stmt->bindParam(':vote', $data["vote"]);
        $stmt->bindParam(':faute', $data["faute"]);
        $stmt->bindParam(':phrase', $data["phrase"]);
        $stmt->bindParam(':signalement', $data["signalement"]);
        $stmt->execute();

        // Return a success message with the ID of the added fact
        return ["message" => "Nouvelle phrase ajoutée : " . $conn->lastInsertId()];
    } catch (PDOException $e) {
        return ["Error" => $e->getMessage()];
    }
}

//PUT method
function updateFact($id, $data, $conn)
{
    try {
        // Prepare the update statement with placeholders
        $stmt = $conn->prepare('UPDATE chuckn_facts SET phrase = :phrase, vote = :vote, faute = :faute, signalement = :signalement WHERE id = :id');
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':vote', $data["vote"]);
        $stmt->bindParam(':faute', $data["faute"]);
        $stmt->bindParam(':phrase', $data["phrase"]);
        $stmt->bindParam(':signalement', $data["signalement"]);
        $stmt->execute();

        // Return a success message with the ID of the updated fact
        return ["message" => "Phrase mise à jour : " . $id];
    } catch (PDOException $e) {
        return ["Error" => $e->getMessage()];
    }
}

// PATCH method
function updateFactPatch($id, $data, $conn)
{
    try {
        $keys = array_keys($data); // Get the keys of the data array
        $values = array_values($data); // Get the values of the data array
        $paramStr = ""; // Initialize an empty string to hold the parameter string

        // Loop through the keys and create a string of parameters
        foreach ($keys as $key) {
            $paramStr .= $key . " = ?, "; // Add the key to the parameter string
        }

        $paramStr = rtrim($paramStr, ", "); // Remove the last comma and space from the parameter string

        array_push($values, $id); // Add the ID to the end of the values array

        $stmt = $conn->prepare("UPDATE chuckn_facts SET $paramStr WHERE id = ?");
        $stmt->execute($values);

        return ["message" => "La phrase a été mise à jour avec succès"];
    } catch (PDOException $e) {
        return ["Error" => $e->getMessage()];
    }
}

function deleteFact($id, $conn)
{
    try {
        $stmt = $conn->prepare("DELETE FROM chuckn_facts WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return ["message" => "La phrase a été supprimée avec succès"];
    } catch (PDOException $e) {
        return ["Error" => $e->getMessage()];
    }
}

?>