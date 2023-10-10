package model

import (
	"errors"

	"go.mongodb.org/mongo-driver/bson"
)

// Utility function for matching the category and unmarshalling the bson []byte into the CategoryDetails interface
// Returns all unmarshalling errors
func MatchDetails(category Category, detailsBytes []byte) (CategoryDetails, error) {
	var err error

	switch category {

	case CategoryConsole:
		var console Console

		err = bson.Unmarshal(detailsBytes, &console)
		if err != nil {
			return nil, err
		}

		return console, nil

	case CategoryAmplifier:
		var amplifier Amplifier

		err = bson.Unmarshal(detailsBytes, &amplifier)
		if err != nil {
			return nil, err
		}

		return amplifier, nil

	case CategoryComputer:
		var computer Computer

		err = bson.Unmarshal(detailsBytes, &computer)
		if err != nil {
			return nil, err
		}

		return computer, nil

	case CategoryMicrophones:
		var microphone Microphone

		err = bson.Unmarshal(detailsBytes, &microphone)
		if err != nil {
			return nil, err
		}

		return microphone, nil

	case CategoryStagebox:
		var stagebox StageBox

		err = bson.Unmarshal(detailsBytes, &stagebox)
		if err != nil {
			return nil, err
		}

		return stagebox, nil

	case CategoryMonitoring:
		var monitor Monitoring

		err = bson.Unmarshal(detailsBytes, &monitor)
		if err != nil {
			return nil, err
		}

		return monitor, nil

	case CategoryProcessor:
		var processor Processor

		err = bson.Unmarshal(detailsBytes, &processor)
		if err != nil {
			return nil, err
		}

		return processor, nil

	case CategorySpeaker:
		var speaker Speaker

		err = bson.Unmarshal(detailsBytes, &speaker)
		if err != nil {
			return nil, err
		}

		return speaker, nil

	case CategoryTransmitter:
		var tx Tx

		err = bson.Unmarshal(detailsBytes, &tx)
		if err != nil {
			return nil, err
		}

		return tx, nil

	case CategoryReceiver:
		var rx Rx

		err = bson.Unmarshal(detailsBytes, &rx)
		if err != nil {
			return nil, err
		}

		return rx, nil

	default:
		return nil, errors.New("Unimplemnted Category" + category.String())
	}

	return nil, nil
}

// func MatchInputs(category Category, )
